getRandomDogImageURL((url) =>{
    const img = document.createElement('img');
    img.src = url;
    document.body.append(img)
});