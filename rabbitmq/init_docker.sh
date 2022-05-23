docker pull rabbitmq:3.8-management
docker run -d --name innfis-rabbit -p 8080:15672 -p 5671:5671 -p 5672:5672 rabbitmq:3.8-management