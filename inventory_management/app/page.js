'use client'
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, setDoc, getDoc } from 'firebase/firestore';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    console.log(inventoryList);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
      bgcolor="#f5f5f5"
      p={4}
    >
    <Typography
      fontSize="5vw"
      >
       Yasmeen Hussein
        </Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2} mt={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box
        border="1px solid #ddd"
        borderRadius={2}
        width="80%"
        mt={4}
        p={2}
        bgcolor="white"
        boxShadow={3}
      >
        <Box
          width="100%"
          py={2}
          bgcolor="#1976d2"
          borderRadius={2}
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" textAlign="center">
            Supplies Needed
          </Typography>
        </Box>
        <Stack width="100%" mt={2} spacing={2} overflow="auto">
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f9f9f9"
              p={2}
              borderRadius={2}
              boxShadow={1}
            >
              <Typography variant="h6" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h6" textAlign="center">
                Quantity: {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => addItem(name)}>
                  Add
                </Button>
                <Button variant="outlined" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
