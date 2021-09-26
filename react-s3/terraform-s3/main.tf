
provider "aws" {
	region = "ap-northeast-2"
	shared_credentials_file = "~/.aws/credentials"
	profile = "InnfisDev"
}

resource "aws_s3_bucket" "image-bucket" {
	bucket = "image-storage-innfi" 
	acl = "public-read-write"

	cors_rule {
		allowed_headers = ["*"] 
		allowed_methods = ["PUT", "POST"]
		allowed_origins = ["*"]
	}
}