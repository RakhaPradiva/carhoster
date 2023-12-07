import { useState } from "react";
import { Box, TextField, Grid, Container, Typography } from "@mui/material";
import { Button } from "@mui/joy";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

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
						<TextField required fullWidth label="Nama" value={name} onChange={(e) => setName(e.target.value)} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField required fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</Grid>
					<Grid item xs={12}>
						<TextField required fullWidth multiline rows={6} label="Pesan" value={message} onChange={(e) => setMessage(e.target.value)} />
					</Grid>
					<Grid item xs={12}>
						<Button variant="solid" type="submit">
							Kirim
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default Contact;
