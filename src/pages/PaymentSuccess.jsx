import { Box, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
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
				variant="h2"
				component="h1"
				gutterBottom
				sx={{
					color: "success.main",
				}}
			>
				Pembayaran Berhasil
			</Typography>
			<Typography variant="h4" component="p" gutterBottom>
				Terima kasih telah melakukan pembayaran. Silahkan cek email Anda untuk informasi lebih lanjut.
			</Typography>

			<Button variant="plain" component={Link} to="/">
				Go back Home
			</Button>
		</Box>
	);
};

export default PaymentSuccess;
