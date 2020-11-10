
class PhotoGallery{
	constructor(){
		this.API_KEY = "563492ad6f91700001000001b55c22be6cce43c2bdcdd131f55fec15";
		this.galleryDiv = document.querySelector(".row");
		this.searchForm = document.querySelector("header .search form");
		this.loadMore = document.querySelector(".load-more");
		this.logo = document.querySelector(".logo")
		this.pageIndex = 1;
		this.searchValueGlobal = '';
		this.eventHandle();
	}

	//Methods
	eventHandle(){
		//Image Fetch Function
		document.addEventListener("DOMContentLoaded", () => {
			this.getImg(1);
		});

		//Search Form Function
		this.searchForm.addEventListener('submit', (e) => {
			this.pageIndex = 1;
			this.getSearchImages(e);
		});

		//Load More Function
		this.loadMore.addEventListener("click", (e) => {
			this.loadMoreImages(e);
		});

		//Click on Logo to reach home page
		this.logo.addEventListener("click", () => {
			this.pageIndex = 1;
			this.galleryDiv.innerHTML = '';
			this.getImg(this.pageIndex);
		});
	}

	async getImg(index){
		this.loadMore.setAttribute("data-img", "curated");
		const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
		const data = await this.fetchImages(baseURL);
		this.GenerateHTML(data.photos);
	}

	//Fetch Image Function
	async fetchImages(baseURL){
		const response = await fetch(baseURL,{
			method: 'GET',
			headers:{
				Accept: 'application/json',
				Authorization: this.API_KEY
			}	
		});
		const data = await response.json();
		return data;
	}

	//Generate HTML
	GenerateHTML(photos){
		photos.forEach(photo => {
			const item = document.createElement('div');
			item.classList.add('col-4');

			item.innerHTML = `
				    <a href="${photo.src.original}" target="_blank">
				    	<div class="card">
					        <img src="${photo.src.medium}" alt="..." class="img-fluid" />
					        <div class="card-body">
					            <h5 class="card-title">Photographer: <b>${photo.photographer}</b></h5>
					        </div>
					    </div>  
				    </a>                      
				`;
			//Add photos to HTML
			this.galleryDiv.appendChild(item);
		});
	}

	//Search Form Function Declaration
	async getSearchImages(e){
		this.loadMore.setAttribute("data-img", "search");
		e.preventDefault();
		this.galleryDiv.innerHTML = '';
		const searchValue = e.target.querySelector('input').value;
		this.searchValueGlobal = searchValue;
		const baseURL = await `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
		const data = await this.fetchImages(baseURL);
		this.GenerateHTML(data.photos);
		e.target.reset();
	}


	async getMoreSearchImages(index){
		const baseURL = await `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`;
		const data = await this.fetchImages(baseURL);
		this.GenerateHTML(data.photos);
	}

	//Load More function Declaration
	loadMoreImages(e){
		let index = ++this.pageIndex;
		const loadMoreData = e.target.getAttribute("data-img");
		if(loadMoreData === 'curated'){
			//Load Page 2 for curated
			this.getImg(index);
			console.log(index)
		}else{
			this.getMoreSearchImages(index)
		}
	}


}

const gallery = new PhotoGallery;


//Dark Mode
function myFunction() {
	// Get the checkbox
	const darkMode = document.getElementById("dark-mode");
	const checkLabel = document.getElementById("check-label");

	// If the checkbox is checked, display the output text
	if (darkMode.checked == true){
		document.body.classList.add("dark");
		checkLabel.innerHTML = "<i class='bx bxs-sun' ></i>";

	} else {
		document.body.classList.remove("dark");
		checkLabel.innerHTML = "<i class='bx bxs-moon'></i>";
  }
}