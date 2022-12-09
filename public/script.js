var swiper = new Swiper(".mySwiper", {});
let inputMulti = document.getElementById("multiUp")
const photoDataElem = document.getElementById("photodatas")
let swiperWrapper = document.querySelector('.swiper-wrapper')
const submitBtn = document.getElementById('submit')
const form = document.getElementById('form')

const appState = {
  data: [],
  selectedIndex: null,
};

const getPhotoData = async() => {
    let url = "http://localhost:3000/uploads"

    const response = await fetch(url)
    const data = await response.json()
    return data
}

const postPhotoData = async (e) => {
    e.preventDefault();
    const files = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    files.append("photographerName", e.target.photographerName.value);
    files.append("photoTitle",  e.target.photoTitle.value);
    files.append("photoUrl", e.target.file.files[0]);  
    console.log(e)

    let url = "http://localhost:3000/profile-upload-single"
    const response = await fetch(url, {
        method:"POST",
        headers:  {"Content-Type": "multipart/form-data"},
        body:files,
    })
 
    getPhotoData();
    if (response.status === 204) {
      alert("Uploaded successfully!");
    }
}

form.addEventListener("submit",(e)=>{postPhotoData(e)})

const loadPhotoData = async () => {
    const data = await getPhotoData()
   
    for(let i=0; i<data.length; i++){
      console.log(data[i].photoTitle)
      console.log(data[i].photographerName)
      console.log(data[i].photoUrl)
      // photoDataElem.innerText = data[i].photographerName+"'s photo"
      const photo = document.createElement("img")
      const swiperSlide = document.createElement("div")
      const name = document.createElement("p")
      name.id="name"
      name.innerText=data[i].photographerName + ": " + data[i].photoTitle
      swiperSlide.appendChild(name)
      swiperWrapper.appendChild(swiperSlide)
      swiperSlide.className='swiper-slide'
      swiperSlide.appendChild(photo)
      let source = `http://localhost:3000/${data[i].photoUrl}`
      photo.src=source
      
    }
    const deleteBtn = document.createElement('button')
      photoDataElem.appendChild(deleteBtn)
      deleteBtn.className='deleteBtn'
      deleteBtn.innerText="Delete"
}
loadPhotoData()

/*---display input --- */

const openInput = document.getElementById('openInput');
const closeBtn = document.getElementById('closebtn');
openInput.addEventListener('click',openUploads);
closeBtn.addEventListener('click',closeUploads)
function openUploads() {
   
    document.getElementById("form").style.top = "130px";
  }
  
function closeUploads() {
   
    document.getElementById("form").style.top = "-360px";
  }


  /*Swiper btn */
  var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });