dayNightTheme = () => {
    let date = new Date();
    let hour = date.getHours();
  
    if(hour >= 7 && hour < 19){
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
    else{
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    }
  }
  
  window.addEventListener('load', dayNightTheme);

  document.querySelector("#input").addEventListener("keydown", (event) => {
    if (event.key == "Enter")
      apiRequest();
  });

  document.querySelector("#search").addEventListener("click", () => {
      apiRequest();
  });

  apiRequest = () => {
    const loader = document.getElementById('loader');
    const loadingText = document.getElementById('loading');
    loader.style.display = 'block';
    loadingText.style.display = 'block';

    document.querySelector("#grid").textContent = "";

    const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

    fetch(url)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => {
        loadImages(data);
        loader.style.display = 'none';
        loadingText.style.display = 'none';
      })
      .catch(error => {
        console.log(error);
        loader.style.display = 'none';
        loadingText.style.display = 'none';
      });
  }

  loadImages = (data) => {
    for(let i = 0;i < data.results.length;i++){
      let image = document.createElement("div");
      image.className = "img";
      image.style.backgroundImage = "url("+data.results[i].urls.raw + "&w=1366&h=768" +")";
      image.addEventListener("dblclick", function(){
        window.open(data.results[i].links.download, '_blank');
      })
      document.querySelector("#grid").appendChild(image);

      let downloadLink = document.createElement("a");
      downloadLink.href = data.results[i].links.download;
      downloadLink.download = 'njbserver.jpg';  
      downloadLink.innerHTML = '<i class="fas fa-download"></i>';
      downloadLink.className = 'download-link';
      image.appendChild(downloadLink);

      document.querySelector("#grid").appendChild(image);
    }
  }

  document.oncontextmenu = function() {
    return false;
};

document.onselectstart = function() {
    return false;
}  

  