import "./assets/main.css";
import { useState, useEffect } from "react";
import { ImageCard } from "./components/imageCard";
import { ImageSearch } from "./components/imageSearch";

require("dotenv").config();

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`
    )
      .then((res) => res.json())
      .then((data) =>{
        setImages(data.hits)
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
    <ImageSearch setTerm={setTerm}/>
    {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1> :
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => {
          return  <ImageCard key={image.id} image={image}/>
         
        })}
      </div>
    }
    </div>
  );
}

export default App;
