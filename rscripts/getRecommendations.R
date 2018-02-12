library(reshape2)
library(methods)
library(recommenderlab)

args <- commandArgs(TRUE)

movName <- args[1]

if(length(args) > 1) {
	movName = paste(args[1], args[2], sep=" ")
}

movies <- read.csv("movies.csv", header = TRUE, stringsAsFactors=FALSE)
movies <- movies[with(movies, order(title)), ]
ratings <- read.csv("ratings100k.csv", header = TRUE)

mvName <- (movies[grep(movName, movies$title, ignore.case = TRUE) ,])
movName1 = mvName$title[1]

# Filter for based on genre of selected movies to enhance recommendations
cat1 <- subset(movies, title==movName1)

# If genre contains 'Sci-Fi' then  return sci-fi movies 
# If genre contains 'Children' then  return children movies
if (grepl("Sci-Fi", cat1$genres)) {
  movies2 <- (movies[grepl("Sci-Fi", movies$genres) , ])
} else if (grepl("Children", cat1$genres)) {
  movies2 <- movies[grepl("Children", movies$genres), ]
} else {
  movies2 <- movies[grepl(cat1$genre1, movies$genres), ]
}

movName2 = movies2$title[2]
movName3 = movies2$title[3]

row_num <- which(movies2[,3] == movName)
row_num2 <- which(movies2[,3] == movName2)
row_num3 <- which(movies2[,3] == movName3)
userSelect <- matrix(NA,length(unique(ratings$movieId)))
userSelect[row_num] <- 5 #hard code first selection to rating 5
userSelect[row_num2] <- 4 #hard code second selection to rating 4
userSelect[row_num3] <- 4 #hard code third selection to rating 4
userSelect <- t(userSelect)

ratingmat <- dcast(ratings, userId~movieId, value.var = "rating", na.rm=FALSE)
ratingmat <- ratingmat[,-1]
colnames(userSelect) <- colnames(ratingmat)
ratingmat2 <- rbind(userSelect,ratingmat)
ratingmat2 <- as.matrix(ratingmat2)

#Convert rating matrix into a sparse matrix
ratingmat2 <- as(ratingmat2, "realRatingMatrix")

#Create Recommender Model
recommender_model <- Recommender(ratingmat2, method = "UBCF",param=list(method="Cosine",nn=30))
recom <- predict(recommender_model, ratingmat2[1], n=30)
recom_list <- as(recom, "list")
recom_result <- data.frame(matrix(NA,30))
recom_result[1:30,1] <- movies2[as.integer(recom_list[[1]][1:30]),3]
recom_result <- data.frame(na.omit(recom_result[order(order(recom_result)),]))
recom_result <- data.frame(recom_result[1:10,])

library(rjson)
#x <- toJSON(unname(split(recom_result, 1:nrow(recom_result))))
x <- toJSON(recom_result)
x