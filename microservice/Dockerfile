FROM soajsorg/node

RUN mkdir -p /opt/soajs/soajs.seed/node_modules/
WORKDIR /opt/soajs/soajs.seed/
COPY . .
RUN npm install

CMD ["/bin/bash"]