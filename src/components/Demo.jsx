import {submit,copy,linkIcon,loader,tick } from "../assets";
import {  useEffect ,useState } from "react";
import { useLazyGetSummaryQuery } from "../services/article";


let Demo = ()=> {
  const [article, setArticle] = useState({
    url: '',
    summary : ''
  });
  const [allArticles,setAllArticles] = useState([]);
  const [getsummary,{error , isFetching}] = useLazyGetSummaryQuery();
  const [copied,setCopied] = useState('')  

  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }
  },[])


  const handelCopy= (url) =>{
    setCopied(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  const handelSubmite = async (e)=>{
    e.preventDefault()

    const {data} = await getsummary({
      article: article.url
    });
    // console.log(data)
    if(data?.summary){
      const newArticle ={...article,summary:data.summary};
      const updateAllArticles =[newArticle,...allArticles];

      setArticle(newArticle);
      setAllArticles(updateAllArticles)

      localStorage.setItem('articles',JSON.stringify(updateAllArticles))
    } 
  }

  return (
    <section className="mt-16 w-full max-w-xl ">

      <div className="flex flex-col w-full gap-2">
        <form className=" relative flex  justify-center items-center"
        onSubmit={(e)=>handelSubmite(e)}
        >

          <img src={linkIcon} alt="link Icon"
          className=" absolute left-0 my-2 ml-3 w-5"
          />
          <input type="url" 
          placeholder="Enter a url.."
          value={article.url}
          onChange={(e)=>setArticle({
            ...article,
            url:e.target.value
          })}
          required
          className="url_input peer"
          /> 

          <button type="submit"
           className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
           >
            <img className="w-[50%] h-[50%] object-contain" src={submit} alt="submit_btn" />
          </button>
        </form>

        
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((item,index)=>(
              <div key={`link-${index}`}
              onClick={()=> setArticle(item)}
              className="link_card"
              >
                <div className="copy_btn" onClick={()=> handelCopy(item.url)}>
                  <img src={copied === item.url ? tick : copy} alt="copy_icon"
                   className=" w-[40%] h-[40%] object-contain"
                  />

                </div>
                <p className="flex font-satoshi text-blue-700 font-medium text-sm truncate ">{item.url}</p>
              </div>
            ))}
        </div>
      </div>


      <div className="my-10 max-w-full flex justify-center items-center">
        { isFetching ?(
        <img src={loader} alt="loder" 
          className="w-20 h-20 object-contain"
        />):error ?(
          <p className="font-inter fornt-bold text-black text-center ">
            Well ,that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">

              {error?.data?.error}
            </span>
            </p>
        ):(
          article.summary &&(
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summray-box">
                <p className="front-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )

        }

      </div>
    </section>
  )
}

export default Demo