import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

const SubsectionHeader = ({ children, fontSize = "0.9rem" }) => {
  return (
    <Typography
      textTransform="uppercase"
      color={grey[500]}
      fontWeight={500}
      fontSize={fontSize}
      letterSpacing={`calc(${fontSize} * 0.0695)`}
    >
      {children}
    </Typography>
  );
};

export default SubsectionHeader;
