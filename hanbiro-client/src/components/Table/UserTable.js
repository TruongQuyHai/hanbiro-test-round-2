import { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

import { styled } from "@mui/system";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Link as RouterLink } from "react-router-dom";
import TableHeader from "../TableHead";
import MemberModal from "components/MemberModal";

import { api } from "utils/api";

function createData(
  id,
  name,
  phoneNumber,
  major,
  studentYear,
  cvFile,
  startDate,
  endDate,
  internResult
) {
  return {
    id,
    name,
    phoneNumber,
    major,
    studentYear,
    cvFile,
    startDate,
    endDate,
    internResult,
  };
}

const students = [
  createData(
    "1",
    "Test1",
    "12345678",
    "Computer Science",
    "2020",
    "test1.pdf",
    "2020-01-01",
    "2020-01-01",
    "Accepted"
  ),
  createData(
    "2",
    "Test2",
    "12345678",
    "Computer Science",
    "2020",
    "test2.pdf",
    "2020-01-01",
    "2020-01-01",
    "Failed"
  ),
  createData(
    "3",
    "Test3",
    "12345678",
    "Computer Science",
    "2020",
    "test3.pdf",
    "2020-01-01",
    "2020-01-01",
    "Accepted"
  ),
  createData(
    "4",
    "Test4",
    "12345678",
    "Computer Science",
    "2020",
    "test4.pdf",
    "2020-01-01",
    "2020-01-01",
    "Accepted"
  ),
  createData(
    "5",
    "Test5",
    "12345678",
    "Computer Science",
    "2020",
    "test5.pdf",
    "2020-01-01",
    "2020-01-01",
    "Failed"
  ),
  createData(
    "6",
    "Test6",
    "12345678",
    "Computer Science",
    "2020",
    "test6.pdf",
    "2020-01-01",
    "2020-01-01",
    "Accepted"
  ),
];

const StyledPaper = styled(Paper)({
  maxWidth: 1100,
  border: "1px solid #e0e0e0",
});

const headers = [
  { name: "name", label: "Name", sortable: true, align: "left" },
  { name: "phone", label: "Phone Number", sortable: true, align: "center" },
  { name: "major", label: "Major", sortable: false, align: "center" },
  {
    name: "studentYear",
    label: "Student Year",
    sortable: true,
    align: "center",
  },
  { name: "cvfile", label: "CV file", sortable: false, align: "center" },
  { name: "startDate", label: "Start date", sortable: true, align: "center" },
  { name: "endDate", label: "End date", sortable: true, align: "center" },
  {
    name: "result",
    label: "Internship result",
    sortable: false,
    align: "center",
  },
  { name: "action", label: "Action", sortable: false, align: "center" },
];

const initialSortedItem = {
  sortedField: "",
  isDescending: false,
};

export default function UserTable({ users, setUsers }) {
  const [modalOpen, setModalOpen] = useState(false);
  // sorted UI state, no logic implemented
  const [sortedItem, setSortedItem] = useState(initialSortedItem);
  // setting menu popup
  const anchorElArr = useRef(Array(students.length).fill(null));
  const [currIdx, setCurrIdx] = useState(-1);
  const open = currIdx !== -1;

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEditMenuItemButtonClick = () => {
    setModalOpen(true);
    handleClose();
  };

  const handleClick = (eleIdx) => {
    setCurrIdx(eleIdx);
  };

  const handleClose = () => {
    setCurrIdx(-1);
  };

  const handleDeleteStudent = async (studentId) => {
    handleClose();
    try {
      await api.delete(`/admin/intern/${studentId}`);
      setUsers(users.filter((user) => user.studentId !== studentId));
    } catch (err) {
      alert(err);
    }
  };

  const keyboardEvent = (e) => {
    for (let i = 0; i < anchorElArr.current?.length; i++) {
      const ele = anchorElArr.current?.[i]?.ele;
      if (e.code === "Enter" && ele.contains(document.activeElement)) {
        setCurrIdx(ele);
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", keyboardEvent);
    return () => document.body.removeEventListener("keydown", keyboardEvent);
  }, [anchorElArr]);

  return (
    <>
      <TableContainer component={StyledPaper}>
        <Table aria-label="student table">
          <TableHeader
            headers={headers}
            sort={{
              sortedField: sortedItem.sortedField,
              isDescending: sortedItem.isDescending,
            }}
            onChangeSort={(name, e) => {
              if (sortedItem.sortedField === name) {
                setSortedItem((state) => ({
                  ...state,
                  isDescending: !state.isDescending,
                }));
              } else {
                setSortedItem({ sortedField: name, isDescending: false });
              }
            }}
          />

          <TableBody>
            {users.map(({ studentId, ...student }, index) => (
              <TableRow
                key={studentId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.name}
                </TableCell>
                <TableCell align="center">{student.phone}</TableCell>
                <TableCell align="center">{student.major}</TableCell>
                <TableCell align="center">{student.year}</TableCell>
                <TableCell align="center" sx={{ cursor: "pointer" }}>
                  <Tooltip title="Download filename..." placement="top">
                    <PictureAsPdfIcon
                      htmlColor="#E61B23"
                      tabIndex={index * 2 + 1}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="center">{student.startDate}</TableCell>
                <TableCell align="center">{student.endDate}</TableCell>
                <TableCell align="center">{student.result}</TableCell>
                <TableCell align="center">
                  <Tooltip title="More Actions" placement="top">
                    <MoreHorizIcon
                      cursor="pointer"
                      onClick={() => handleClick(index)}
                      tabIndex={index * 2 + 2}
                      ref={(ele) =>
                        (anchorElArr.current[index] = { ele, id: studentId })
                      }
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {currIdx !== -1 && anchorElArr.current && (
        <Menu
          id="action-menu"
          anchorEl={anchorElArr.current[currIdx].ele}
          open={open}
          onClose={handleClose}
        >
          {/* change page onclick */}
          <MenuItem onClick={handleClose}>
            <Link
              color="#000"
              underline="none"
              component={RouterLink}
              to={`/admin/member/${anchorElArr.current[currIdx].id}`}
            >
              View Detail
            </Link>
          </MenuItem>
          <MenuItem onClick={handleEditMenuItemButtonClick}>
            Update Information
          </MenuItem>
          <MenuItem
            onClick={() => handleDeleteStudent(anchorElArr.current[currIdx].id)}
          >
            Delete Record
          </MenuItem>
        </Menu>
      )}
      <MemberModal
        containerId="EditMemberModal"
        type="edit"
        userId={anchorElArr.current?.[currIdx]?.id}
        open={modalOpen}
        onSubmit={async (e, user) => {
          try {
            e.preventDefault();
            await api.put(`/admin/intern/${user?.studentId}`, user);
            setUsers(
              users.map((u) => (u.studentId === user.studentId ? user : u))
            );
          } catch (err) {
            alert(err);
          }
        }}
        onClose={handleCloseModal}
      />
    </>
  );
}
