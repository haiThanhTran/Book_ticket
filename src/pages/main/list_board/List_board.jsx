import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { mockData } from "../../../apis/mock-data";
import { cloneDeep } from "lodash";
import Slide from "@mui/material/Slide";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function ListBoard() {
  const movieDetails = cloneDeep(mockData.apiMovie.movie);
  const [currentIndex, setCurrentIndex] = useState(0);
  const filmsPerPage = 6;
  const checked = true;
  console.log("currentIndex", currentIndex);
  const nextFilms = () => {
    if (currentIndex + filmsPerPage < movieDetails.length) {
      setCurrentIndex(currentIndex + filmsPerPage);
    }
  };

  const prevFilms = () => {
    if (currentIndex - filmsPerPage >= 0) {
      setCurrentIndex(currentIndex - filmsPerPage);
    }
  };

  return (
    <Box sx={{overflow: "hidden"}}>
      <Box
        sx={{
          display: "flex",
          margin: "40px 0 0 0",
          width: "100%",
          position: "relative",
          left: "10%",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#DA8F00"
        }}
      >
        | PHIM ĐANG CHIẾU
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 2,
          position: "relative",
        }}
      >
        <Button
          onClick={prevFilms}
          sx={{
            position: "absolute",
            left: "5%",
            color: "grey",
            minWidth: "40px",
            height: "40px",
            fontSize: "20px",
            "&:hover": {
              color: "grey",
              transform: "scale(1.2)",
              backgroundColor: "white",
            },
          }}
        >
          <ArrowBackIosIcon />
        </Button>
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
          <Box sx={{ display: "flex", width: "80%", height: "272px" }}>
            {movieDetails
              .slice(currentIndex, currentIndex + filmsPerPage)
              .map((film) => (
                <Box
                  key={film.id}
                  sx={{
                    margin: 1,
                    textAlign: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={film.image}
                    alt={film.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.2s ease-in-out", // Thêm hiệu ứng chuyển động mềm mại
                      "&:hover": {
                        transform: "scale(1.1)", // Phóng to 110% khi hover
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
              ))}
          </Box>
        </Slide>
        <Button
          onClick={nextFilms}
          sx={{
            position: "absolute",
            right: "5%",
            color: "grey",
            minWidth: "40px",
            height: "40px",
            fontSize: "20px",
            "&:hover": {
              color: "grey",
              transform: "scale(1.2)",
              backgroundColor: "white",
            },
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default ListBoard;
