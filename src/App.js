// import { Component } from "react";
// import styles from "./components/styles.module.css";

// //import "./App.css";
// import LoadSpinner from "./components/Loader";
// import SearchBar from "./components/Searchbar";
// import { ToastContainer } from "react-toastify";
// import ImageGallery from "./components/ImageGallery";
// import fetchPicture from "./components/Api";
// import Modal from "./components/Modal";
// import Button from "./components/Button";
// //import Img from "./components/img";

// export default class App extends Component {
//   state = {
//     images: [],
//     currentPage: 1,
//     searchQuery: "",
//     loading: false,
//     largeModalImage: "",
//     alt: "",
//     error: null,
//     showModal: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fechImages();
//     }
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.toggleModal();
//       window.removeEventListener("keydown", this.handleKeyDown);
//     }
//   };

//   backDroppCloseModal = (event) => {
//     if (event.target === event.currentTarget) {
//       this.toggleModal();
//     }
//   };

//   fechImages = () => {
//     const { currentPage, searchQuery } = this.state;

//     this.setState({
//       loading: true,
//     });
//     fetchPicture(searchQuery, currentPage)
//       .then((hits) =>
//         this.setState((prevState) => ({
//           images: [...prevState.images, ...hits],
//           currentPage: prevState.currentPage + 1,
//         }))
//       )
//       .catch((error) => this.setState({ error }))
//       .finally(() => {
//         currentPage > 1 && this.scrollTo();
//         this.setState({
//           loading: false,
//         });
//       });
//   };

//   scrollTo = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: "smooth",
//     });
//   };

//   handleSubmit = (query) => {
//     this.setState({
//       searchQuery: query,
//       images: [],
//       currentPage: 1,
//       //largeModalImage: this.props.hits.largeImageURL,
//     });
//   };

//   toggleModal() {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   }
//   onClickGalleryItem = ({ largeImageURL, tags }) => {
//     this.setState({ largeModalImage: largeImageURL, alt: tags });
//     this.toggleModal();
//   };

//   render() {
//     const { loading, images, showModal, largeModalImage, alt } = this.state;

//     return (
//       <div className={styles.div}>
//         {showModal && (
//           <Modal
//             largeImageURL={largeModalImage}
//             alt={alt}
//             onClickbackDrop={this.backDroppCloseModal}
//           />
//         )}
//         <SearchBar onSubmit={this.handleSubmit} />
//         <ImageGallery
//           images={images}
//           setLargImg={this.onClickGalleryItem}
//           onClick={this.toggleModal}
//         />
//         {images.length > 0 && <Button onClick={this.fechImages} />}
//         <ToastContainer auotoclose={2000} />
//         {loading && <LoadSpinner />}
//         {images && <div>{images.name} </div>}
//       </div>
//     );
//   }
// }
////////////////
import { useState, useEffect } from "react";
import styles from "./components/styles.module.css";

//import "./App.css";
import LoadSpinner from "./components/Loader";
import SearchBar from "./components/Searchbar";
import { ToastContainer } from "react-toastify";
import ImageGallery from "./components/ImageGallery";
import fetchPicture from "./components/Api";
import Modal from "./components/Modal";
import Button from "./components/Button";
//import Img from "./components/img";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setquery] = useState("");
  const [loading, setLoading] = useState(false);
  const [largeModalImage, setLargeModalImage] = useState("");
  const [alt, setAlt] = useState("");
  //const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query === "") {
      console.log("query", query);
      return;
    }

    setLoading(true);
    fetchPicture(query, page)
      .then((hits) =>
        setImages(
          [...hits]
          // (prevState) => [...prevState.images, ...hits]
          //  setPage(+1))
        )
      )
      .catch((error) => alert(error))
      .finally(() => {
        page > 1 && scrollTo();
        setLoading(false);
      });

    // window.addEventListener("keydown", handleKeyDown);
  }, [query, page]);

  const scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleSubmit = (query) => {
    console.log("object", query);
    setquery(query);
    setImages([]);
    setPage(1);
  };

  function toggleModal() {
    setShowModal(true);
  }

  const onClickGalleryItem = ({ largeImageURL, tags }) => {
    setLargeModalImage(largeImageURL);
    setAlt(tags);
    toggleModal();
  };

  return (
    <div className={styles.div}>
      {showModal && (
        <Modal
          largeImageURL={largeModalImage}
          alt={alt}
          // toggleModal={toggleModal}
          onClick={toggleModal}
        />
      )}
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery
        images={images}
        setLargImg={onClickGalleryItem}
        onClick={toggleModal}
      />
      {/* {images.length > 0 && <Button onClick={this.fechImages}  */}
      {images.length > 0 && <Button onClick={fetchPicture} />}
      <ToastContainer auotoclose={2000} />
      {loading && <LoadSpinner />}
      {images && <div>{images.name} </div>}
    </div>
  );
}
