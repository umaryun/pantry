"use client"
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { fireStore } from "@/firebase";
import { collection, query, getDocs, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  gap:3,
};


export default function Home() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // set the pantry to an empty array
  const [pantry, setPantry] = useState([]);

  const start = async () => {
    const element = query(collection(fireStore, "pantry"))
    const snapshot = await getDocs(element)
    const pantryList = [];
    snapshot.forEach(element => {
      pantryList.push({ name: element.id, ...element.data() })
    });
    setPantry(pantryList);
  }

  useEffect(() => {

    start();
  }, [])

  const [itemName, setItemName] = useState("")
  //add an item to the pantry database
  const addItem = async (item) => {
    const docRef = doc(collection(fireStore, 'pantry'), item)
    // get the current state of the items on the database
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) { 
      const { count } = docSnap.data()
      await setDoc(docRef, {count: count + 1})
    } else {
      await setDoc(docRef, {count: 1})
    }
    
    await start()
    await window.alert(`${item} added to pantry`)
  }
  // remove an item from the pantry database
  const removeItem = async (item) => {
    const docRef = doc(collection(fireStore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      if (count == 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {count: count - 1})
      }
    }
    await start()
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <Button variant="contained" onClick={handleOpen}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2" gap={2}>
            Add item to pantry
          </Typography>
          <Stack direction={"row"} gap={2} width={'100%'} marginTop={"8px"}>
            <TextField id="outlined-basic" label="item" variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName("")
                handleClose()
              }}
            >Add</Button>
          </Stack>        </Box>
      </Modal>
      <Box border={"2px solid #000"}>
        
        <Box
          width={"800px"}
          height={"100px"}
          bgcolor={"#00008B"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          
          <Typography
            variant="h3"
            color={"#fff"}
            textAlign={"center"}
            bgcolor={"#00008B"}
           
         
          >
            pantry items
          </Typography>
        </Box>
        <Stack
          width="800px"
          height="300px"
          spacing={2}
          overflow={"auto"}
        >
          {pantry.map(({name, count}) => (
              <Box
                key={name}
                width="100%"
                minHeight="150px"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"#f0f0f0"}
                color={"black"}
                paddingX={5}
              >
                <Typography
                  variant={"h3"}
                  color={"#333"}
                  textAlign={"center"}
                >{
                    name.charAt(0).toUpperCase() + name.slice(1)
                  }
                </Typography>
                <Typography
                  variant="h3"
                  textAlign={'center'}
                  color={'#333'}
                >
                  Quantity: {count}
                </Typography>         
                <Button
                  variant="contained"
                  onClick={() => {
                    removeItem(name)
                  }}>
                  Remove
                </Button>
                </Box>
          )
            )
              }
        </Stack>
        </Box>  
    </Box>
  );
}
