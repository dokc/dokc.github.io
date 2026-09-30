FROM hugomods/hugo:exts-0.154.5

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5001

CMD ["hugo", "server", "-D", "--bind", "0.0.0.0", "--port", "5001", "--baseURL", "/", "--appendPort=false"]
