import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import DialogTitle from "@mui/material/DialogTitle";
import ReactPortal from "components/Portal";
import { useState, useEffect } from "react";
import { api } from "utils/api";

const MemberModal = ({
  open,
  onClose,
  containerId,
  type,
  userId,
  onSubmit,
  ...props
}) => {
  const [userObject, setUserObject] = useState({
    name: "",
    phone: "",
    major: "",
    email: "",
    year: "",
  });

  useEffect(() => {
    (async () => {
      if (userId) {
        const res = await api.get(`/admin/intern/${userId}`);
        console.log(res.data)
        setUserObject(res.data);
      }
    })();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserObject({ ...userObject, [name]: value });
  };

  return (
    <ReactPortal containerId={containerId}>
      <Dialog open={open} onClose={onClose} {...props}>
        <form onSubmit={(e) => onSubmit(e, userObject)}>
          <DialogTitle>{type === "edit" ? "Edit" : "Add Member"}</DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              value={userObject.name}
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="phone"
              name="phone"
              label="Phone Number"
              value={userObject.phone}
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="major"
              name="major"
              label="Major"
              value={userObject.major}
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              value={userObject.email}
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="year"
              name="year"
              label="Year"
              value={userObject.year}
              type="number"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} variant="contained" type="submit">
              {type === "edit" ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </ReactPortal>
  );
};

export default MemberModal;
