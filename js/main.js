//set up vars
let userFormEL=document.querySelector("#user-form")
let userInputEL=document.querySelector("#username")
let languagesEL=document.querySelector(".languages")
let searchTermEL=document.querySelector("#serach-term")
let reposEL=document.querySelector("#repos")
//events

userFormEL.addEventListener("submit",formSubmitHandler);
languagesEL.addEventListener("click",clickHandler);

//functions
function clickHandler(e){
    let lng = e.target.getAttribute("data-lng");
    if(lng){
        reposEL.innerHTML="";
        getLangRepos(lng);
    }
    function getLangRepos(lng){
        let apiUrl="https://api.github.com/search/repositories?q=" + lng;
        fetch(apiUrl)
        .then(res=>res.json())
        .then(data=>displayRepos(data.items,lng))
        .catch(err => alert("something went wrong"))
    }
}

function formSubmitHandler(e){
    e.preventDefault();
    let user = userInputEL.value.trim();
    if(user){
        reposEL.innerHTML="";
        getUserRepos(user);
    }else{
        alert("please enter the user ")
    } 
}
function  getUserRepos(user){
    let apiUrl = "https://api.github.com/users/" + user +"/repos"
    fetch(apiUrl)
    .then(res =>res.json())
    .then(data => displayRepos(data,user))
    .catch(err => alert("something went wrong"))
}
function displayRepos(repos,searchTerm){
    if(repos.length==0){
        reposEL.innerHTML="No Repos..!"
        return;
    }
    searchTermEL.innerHTML=searchTerm;
    repos.forEach(repo=>{
        let name = repo.owner.login + "/" + repo.name;

       reposEL.innerHTML+=
        `
            <a href= './repo.html?repo=${name}' class  ="repo-item">
            <span>${repo.owner.login}/${repo.name} </span>
            <span>${repo.open_issues_count > 0 ? " there are some issues " : "no issues "}</span>
        `
    })
}
