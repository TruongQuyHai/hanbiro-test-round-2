import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import clsx from "clsx";

import PropTypes from "prop-types";
import { TableSortLabel } from "@mui/material";

const sortingState = {
  DESC: "desc",
  ASC: "asc",
  NONE: "none",
}

const TableHeader = ({
  headers,
  className = "",
  onChangeSort = () => {},
  sort = { sortedField: "", isDescending: false },
}) => {
  const _isActive = (name) => sort.sortedField === name;

  return (
    <TableHead className={clsx(className)}>
      <TableRow>
        {headers.map(({ name, label, sortable, align }) => (
          <TableCell key={name} align={align}>
            {sortable ? (
              <TableSortLabel
                active={_isActive(name)}
                direction={sort.isDescending ? "desc" : "asc"}
                onClick={(e) => onChangeSort(name, e)}
              >
                {label}
              </TableSortLabel>
            ) : (
              <span>{label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propsTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool.isRequired,
      align: PropTypes.oneOf(["center", "inherit", "justify", "left", "right"]),
    })
  ).isRequired,
  sort: PropTypes.shape({
    sortedField: PropTypes.string.isRequired,
    isDescending: PropTypes.bool.isRequired,
  }),
  onChangeSort: PropTypes.func,
  className: PropTypes.string,
};

export default TableHeader;
