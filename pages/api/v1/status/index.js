function status(request, response) {
  response.status(200).json({ chave: "Bom dia leozinho" });
}

export default status;
