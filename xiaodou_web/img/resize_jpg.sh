echo "resize image who is bigger than 100k";
for i in `find . -size +100k`;
do
convert $i -resize 50% $i;
echo "resize image $i to 50%";
done
