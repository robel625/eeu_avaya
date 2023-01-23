import Pagination from "@mui/material/Pagination"
import PaginationItem from "@mui/material/PaginationItem"
import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"

const FrontPaginate = ({ postsPerPage, totalPosts, paginate }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }))

  const pageNumbers = Math.ceil(totalPosts / postsPerPage);


  const handleChange = async (number) => {
    if (number === 0) number = 1
    try {
      paginate(number)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      
      <Paper sx={{ borderRadius: 4, mt: "1rem" }} elevation={6}>
        <Pagination
          color="primary"
          count={pageNumbers}
          onChange={(e) => handleChange(e.target.textContent)}
          renderItem={(item) => <PaginationItem {...item} />}
        />
      </Paper>
    </>
  )
}

export default FrontPaginate
