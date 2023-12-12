import { Box, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				textAlign: "center",
				bgcolor: "background.default",
				color: "text.primary",
			}}
		>
			<Typography variant="h1" fontWeight="600" component="h1" gutterBottom>
				404
			</Typography>
			<Typography variant="h4" component="p" gutterBottom>
				Oops! Page not found.
			</Typography>
			<Typography variant="body1" component="p" gutterBottom>
				We couldn&apos;t find the page you were looking for.
			</Typography>
			<Button variant="plain" component={Link} to="/">
				Go back Home
			</Button>
		</Box>
	);
};

export default NotFound;
