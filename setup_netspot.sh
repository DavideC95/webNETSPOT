#GraphLib
mkdir GraphLib/src/build
javac -d GraphLib/src/build -cp lib/meden.jar:. GraphLib/src/*.java
cd GraphLib/src/build
jar cvf GraphLib.jar *
cd ../../../
mv GraphLib/src/build/GraphLib.jar lib/

#Refine
mkdir Refine/src/build
javac -d Refine/src/build -cp lib/GraphLib.jar:lib/meden.jar:. Refine/src/*.java
cd Refine/src/build
jar cvf Refine.jar *
cd ../../../
mv Refine/src/build/Refine.jar lib/

#SigSpot
cd SigSpot/src/
javac -cp ../../lib/GraphLib.jar:../../lib/meden.jar:../../lib/oplall.jar:../../lib/Refine.jar:. SigSpot.java
cd ../../
mv SigSpot/src/*.class ./

mkdir output

