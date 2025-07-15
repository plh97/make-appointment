resource "aws_instance" "app_server" {
  # ami           = "ami-09dac21d1664bc313"  # official one
  # ami           = "ami-0ce99c18a68a1b23b"  # customized one
  # ami           = "ami-008269b555cf0a1bb"  # packer-linux-aws-node-16
  # ami           = "ami-0a0233c494ff969b5" # packer-linux-aws-node-22
  ami           = "ami-07af209e8e88e2352" # packer-linux-aws-t3.micro
  instance_type = "t3.micro"
  key_name      = var.key_name

  tags = {
    Name = "Make Appointment"
  }
  provisioner "local-exec" {
    command = "sh modify_ip.sh ${self.public_ip}"
  }
  metadata_options {
    http_tokens = "required"
  }
}
