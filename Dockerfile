FROM node as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN npm ci \
    && npm run build \
    && npm prune --production

# ---

FROM node

ENV NODE_ENV=production
ENV DB_NAME=nest_blog_db
ENV DB_HOST=database-1.cmyatojneahy.us-east-1.rds.amazonaws.com
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD="qwerty12345"
ENV AT_SECRET=8350e5a3e24c153df2275c9f80692773
ENV RT_SECRET=cdf26213a150dc3ecb610f18f6b38b46

USER node
WORKDIR /home/node

EXPOSE $PORT

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["node", "dist/main.js"]
