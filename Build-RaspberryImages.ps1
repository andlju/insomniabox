& docker build .\client -f .\client\Dockerfile.raspberry -t insomniabox-client
& docker save insomniabox-client -o insomniabox-client.tar

& docker build .\server -f .\server\Dockerfile.raspberry -t insomniabox-server
& docker save insomniabox-server -o insomniabox-server.tar

& docker build .\nginx -f .\nginx\Dockerfile.raspberry -t insomniabox-nginx
& docker save insomniabox-nginx -o insomniabox-nginx.tar

