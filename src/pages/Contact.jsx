import { useState } from "react";
import { Box, TextField, Grid, Container, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, Link } from "@mui/material";
import { Button } from "@mui/joy";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false); // New state for controlling the loading spinner

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const scriptURL = "https://script.google.com/macros/s/AKfycbxBAKF0MepbDwqonZeTD2moH2FoOG6GsXJQ424mBRME95ghvVqs-0BeRoBbwhangyG4/exec";
		const data = new FormData();
		data.append("name", name);
		data.append("email", email);
		data.append("message", message);

		await fetch(scriptURL, {
			method: "POST",
			body: data,
		});
		setName("");
		setEmail("");
		setMessage("");
		setOpen(true);
		setLoading(false); 
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
			<Typography align="center" variant="h4" component="h1" gutterBottom>
				Hubungi Kami
			</Typography>
			<Typography align="center" variant="subtitle1" gutterBottom>
				Silakan isi formulir di bawah ini dan kami akan segera menghubungi Anda kembali.
			</Typography>
			<Box component="form" onSubmit={handleSubmit} sx={{ width: "80%", mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField required type="text" fullWidth label="Nama" value={name} onChange={(e) => setName(e.target.value)} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField required type="email" fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</Grid>
					<Grid item xs={12}>
						<TextField required fullWidth multiline rows={6} label="Pesan" value={message} onChange={(e) => setMessage(e.target.value)} />
					</Grid>
					<Grid item xs={12}>
						<Button variant="solid" type="submit" disabled={loading}>
							Kirim
							{loading && <CircularProgress size={24} sx={{ position: "absolute" }} />}
						</Button>
					</Grid>
				</Grid>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{"Terima kasih"}</DialogTitle>
				<DialogContent>
					<DialogContentText>Pesan anda telah terkirim</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Contact;
