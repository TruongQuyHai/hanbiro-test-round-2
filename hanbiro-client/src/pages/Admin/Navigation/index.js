import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "components/ResponsiveAppBar/ResponsiveAppBar";

const pages = [{ name: "Dashboard", to: "/admin/dashboard" }];
const settings = [{ name: "Logout", to: "/logout" }];

const Navigation = () => {
  return (
    <>
      <ResponsiveAppBar pages={pages} settings={settings} />
      <Container sx={{ padding: "2rem" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Navigation;
