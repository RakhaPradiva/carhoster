import { Box, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";

const PaymentUnfinish = () => {
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
			}}
		>
			<Typography
				variant="h1"
				component="h1"
				gutterBottom
				sx={{
					color: "warning.main",
				}}
			>
				Pembayaran Belum Selesai
			</Typography>
			<Typography variant="h4" component="p" gutterBottom>
				Silahkan coba lagi.
			</Typography>
			<Button variant="plain" component={Link} to="/">
				Go back Home
			</Button>
		</Box>
	);
};

export default PaymentUnfinish;
