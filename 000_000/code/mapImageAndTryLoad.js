function mapImageAndTryLoad(){
    const images = document.querySelectorAll('img[data-src]')
    if(images.length === 0) return 
    images.forEach(img =>{
        const resct = img.getBoundingClientRect()
        img.src  = img.dataset.src
        img.removeAttribute('data-src')
    })
}

window.addEventLister('scroll',throttle(()=>{
   mapImageAndTryLoad()
},100))

