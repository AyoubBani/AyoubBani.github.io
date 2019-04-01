// Layout Elements
const repo = document.querySelector("#repo");
const searchButton = document.querySelector("#searchButton");
const searchResult = document.querySelector("#pagination-container");

//Modal elements
const repositoryname = document.querySelector("#repositoryname");
const language = document.querySelector("#language");
const followers = document.querySelector("#followers");
const url = document.querySelector("#url");
const description = document.querySelector("#description");


let data = []; // fetched Data
let current_data = []; // paginated Data array of 5 elements at max


// this will contain the pagination numbers
numberOfRequests = 0;
// render the a
function cardItems(data) {
    var html = '';
    $.each(data, function (index, repos) {
        html += `<div class="card mb-2"> <div class="card-body"> <a href="#" data-toggle="modal" data-target="#repos" onClick="fillRepo(${index});"> ${repos.owner}/${repos.name} </a></div></div>`;;
    });
    return html;
}
// fetching the repository
const fetchRepos = async (repo) => {
    // use of force-cache to use browser cach
    const api_call = await fetch(`https://api.github.com/legacy/repos/search/${repo}`, { cache: "force-cache" });
    const data = await api_call.json();
    numberOfRequests++;
    return { data };
};

// filling Modal elements
const fillRepo = (index) => {
    repositoryname.innerHTML = current_data[index].name;
    language.innerHTML = current_data[index].language;
    followers.innerHTML = current_data[index].followers;
    url.innerHTML = current_data[index].url;
    description.innerHTML = current_data[index].description;
}

// handling search button click event
searchButton.addEventListener("click", () => {    
    if(repo.value){
        fetchRepos(repo.value).then((res) => {
            if (res.data.message) {
                window.alert(res.data.message)
            }            
            data = res.data.repositories;
            $(function () {
                $('#pagination-container').pagination({
                    dataSource: data,
                    pageSize: 5,
                    callback: function (data, pagination) {
                        // rendering items
                        current_data = data;
                        var html = cardItems(data);                        
                        $('#search-results').html(html);
                    }
                });
            })
        });
    }else{
        window.alert("Please enter a repository");
    }
});