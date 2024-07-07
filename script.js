const apiKey = '706e102df1e34ce8909789b5cf870768';
const blogContainer =  document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;


    } catch(error){
        console.error("Error while fetching rondom news ", error);
        return [];
    }
}
///targetting input field

searchButton.addEventListener(('click'),async()=>{
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);

        }catch(error) {
            console.log("Error fetching news by query",error)
        }
    }
})

async function fetchNewsQuery(query){
     try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;


    } catch(error){
        console.error("Error while fetching rondom news ", error);
        return [];
    }
}



function displayBlogs(articles){
    blogContainer.innerHTML ="";
    articles.forEach((article) =>{
        //first i will create a div and then i would name that by using classList
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) +"...." :article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDesc = article.description.length > 120 ? article.title.slice(0,120) +"...." :article.title;
        description.textContent = truncatedDesc;
        
        //now i will be appending all above in the container
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        //now i will be adding click eventListner 

        blogCard.addEventListener(('click'),()=>{
            window.open(article.url);
        })

        blogContainer.appendChild(blogCard,"_blank");
    })
}

(async () => {
    try{
        
        const articles =await fetchRandomNews();
        displayBlogs(articles);


    } catch(error) {
        console.error("Error while fetching rondom news ", error);
        return [];
    }
})();