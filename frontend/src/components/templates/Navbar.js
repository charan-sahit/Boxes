import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Boxes
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/dfs_complete")}>
            DFS Complete
          </Button>
          <Button color="inherit" onClick={() => navigate("/dfs_partial")}>
            DFS Area partial
          </Button>
          <Button color="inherit" onClick={() => navigate("/dfs_center")}>
            DFS Center
          </Button>
          <Button color="inherit" onClick={() => navigate("/bfs_complete")}>
            BFS Complete
          </Button>
          <Button color="inherit" onClick={() => navigate("/bfs_partial")}>
            BFS Area Partial
          </Button>
          <Button color="inherit" onClick={() => navigate("/bfs_center")}>
            BFS Center
          </Button>
          <Button color="inherit" onClick={() => navigate("/area")}>
            Max Area
          </Button>
          <Button color="inherit" onClick={() => navigate("/wireframes")}>
            Wireframes
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
