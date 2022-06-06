import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserTable from "components/Table/UserTable";
import MemberModal from "components/MemberModal";
import { useState, useEffect } from "react";
import { api } from "utils/api";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      const res = await api.get("/admin/intern");
      setUsers(res.data);
    })();
  }, []);

  return (
    <Container>
      <Box
        marginTop="1rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button variant="contained" onClick={handleOpenModal}>
          Add Profile
        </Button>
      </Box>
      {/* <Box>Advanced Search Box</Box> */}
      <Box marginTop={5} display="flex" justifyContent="center">
        <UserTable users={users} setUsers={setUsers} />
      </Box>
      <MemberModal
        containerId="AddMemberModal"
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={async (e, user) => {
          try {
            e.preventDefault();
            const { data: userCreated } = await api.post("/admin/intern", user);
            setUsers([...users, userCreated]);
          } catch (err) {
            alert(err);
          }
        }}
      />
    </Container>
  );
};

export default AdminPage;
