# webNETSPOT

### Download and install Netspot algorithm

To download and install the netspot algorithm run

```
sh setup_netspot.sh
```

Now run the follow command to test SigSpot:

```
java -cp lib/GraphLib.jar:lib/meden.jar:lib/oplall.jar:lib/Refine.jar:. SigSpot wikipedia990.quadruples 10 10 output/out.txt
```

It should make a new file in **output/out.txt**
