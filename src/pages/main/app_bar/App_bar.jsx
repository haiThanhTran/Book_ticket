import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/system/Box";
import image1 from "../../../assets/images/image1.jpg";
import image2 from "../../../assets/images/image2.png";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { mockData } from "../../../apis/mock-data";
import { cloneDeep } from "lodash";
function App_bar() {
  const movieDetails = cloneDeep(mockData.apiMovie.movie);
  console.log("movieDetails", movieDetails);


  const [currentSlide, setCurrentSlide] = useState(0);
  const [trailerState, setTrailerState] = useState(false);
  const [urlTrailer, setUrlTrailer] = useState("");
  const [trailerTitle, setTrailerTitle] = useState("");

  const openTrailer = (url, title) => {
    setTrailerTitle(title);
    setUrlTrailer(url);
    setTrailerState(true);
  };

  const closeTrailer = () => {
    setUrlTrailer("");
    setTrailerState(false);
  };

  const showSlide = useCallback((index) => {
    const slides = document.querySelectorAll(".slide");
    let newSlideIndex = index;

    //Đoạn này để set index về 0 nếu banner đến vị trí cuối cùng
    if (index >= slides.length) {
      newSlideIndex = 0;
    } else if (index < 0) {
      newSlideIndex = slides.length - 1;
    }
    //Nếu có thay đổi là gọi useState để set lại trạng thái banner
    setCurrentSlide(newSlideIndex);

    // Lấy giá trị px của width để tính toán
    const slideWidth = slides[newSlideIndex].clientWidth;
    document.querySelector(".slides").style.transform = `translateX(${
      -slideWidth * newSlideIndex
    }px)`;
  }, []);

  const nextSlide = useCallback(() => {
    showSlide(currentSlide + 1);
  }, [currentSlide, showSlide]);

  const prevSlide = useCallback(() => {
    showSlide(currentSlide - 1);
  }, [currentSlide, showSlide]);

  useEffect(() => {
    showSlide(currentSlide);
    const handleResize = () => showSlide(currentSlide);
    window.addEventListener("resize", handleResize);
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(autoSlide);
    };
  }, [currentSlide, showSlide, nextSlide]);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
        className="banner-container"
      >
        <Box
          className="banner"
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Box
            className="slides"
            sx={{
              display: "flex",
              transition: "transform 0.5s ease-in-out",
              width: "100%",
            }}
          >
            {movieDetails.map((slide, index) => (
              <Box
                key={index}
                className="slide"
                sx={{ position: "relative", minWidth: "100%", height: "auto" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "50px",
                    left: "30%",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<OndemandVideoIcon />}
                      onClick={() => openTrailer(slide.trailerUrl, slide.title)}
                    >
                      Watch Trailer
                    </Button>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: "50px",
                    right: "30%",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ConfirmationNumberIcon />}
                    >
                      Đặt vé ngay
                    </Button>
                  </Stack>
                </Box>
                <img
                  src={slide.imageBanner}
                  alt={`Phim ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "429.562px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>
          <Box
            component="button"
            className="prev"
            onClick={prevSlide}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              zIndex: 10,
              left: 0,
            }}
          >
            &#10094;
          </Box>
          <Box
            component="button"
            className="next"
            onClick={nextSlide}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              zIndex: 10,
              right: 0,
            }}
          >
            &#10095;
          </Box>
        </Box>
        <Box
          component="button"
          className="login-button"
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#ff6347",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            zIndex: 10,
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          Đăng nhập
        </Box>
      </Box>

      <Dialog open={trailerState} onClose={closeTrailer}>
        <DialogTitle>{trailerTitle}</DialogTitle>
        <DialogContent>
          <iframe
            width="560"
            height="315"
            src={urlTrailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App_bar;
