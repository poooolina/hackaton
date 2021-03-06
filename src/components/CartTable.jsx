import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { ClientContext } from "../context/ClientProvider";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  // Link,
  TableCell,
  Typography,
} from "@mui/material";
import FormOrder from "../pages/FormOrder";

export default function CartTable() {
  const { getCart, cart, changeCount, deleteProductFromCart } =
    React.useContext(ClientContext);
  const [state, setState] = React.useState({
    right: false,
  });

  React.useEffect(() => {
    getCart();
  }, []);

  if (!cart) {
    return <h2>loading...</h2>;
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <h1>Корзина</h1>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      ></Box>
      <List>
        {cart.products.map((item) => (
          <Card
            style={{ border: "0.1px solid #2424 " }}
            sx={{ maxWidth: 300, mt: 5, ml: 3 }}
          >
            <Button onClick={() => deleteProductFromCart(item.product.id)}>
              {/* удалить с корзины */}
              <img width={25} src="/images/delete-cart.png" alt="" />
            </Button>
            <CardActionArea>
              <CardMedia
                image={item.product.image}
                component="img"
                height="140"
                alt="green iguana"
                style={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                <Typography variant="body2" color="text.secondary">
                  Цена:
                  {item.product.price} сом
                  <br />
                  Бренд:
                  {item.product.brand}
                </Typography>
              </CardContent>
            </CardActionArea>
            <div>
              <Button
                sx={{ mb: 2, ml: 2, mr: 2 }}
                style={{ border: "1px solid" }}
                disabled={item.count > 100}
                onClick={() => {
                  changeCount(true, item.product.id);
                }}
              >
                +
              </Button>

              <span>{item.count}</span>

              <Button
                sx={{ mb: 2, ml: 2, mr: 2 }}
                style={{ border: "1px solid" }}
                disabled={item.count < 1}
                onClick={() => {
                  changeCount(false, item.product.id);
                }}
              >
                -
              </Button>
            </div>
          </Card>
        ))}

        <TableCell>
          <strong>Итоговая сумма:</strong>
        </TableCell>
        <TableCell>
          <strong>{cart.totalPrice} сом</strong>
        </TableCell>
      </List>
      <Button
        onClick={toggleDrawer(anchor, false)}
        style={{ border: "1px solid" }}
        sx={{ mt: 1, mb: 2, ml: 2, mr: 2 }}
      >
        К оформление заказа
      </Button>
    </>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{
              backgroundColor: "#8f8888",
              color: "#fff",
              marginLeft: "40px",
            }}
            variant="contained"
            onClick={toggleDrawer(anchor, true)}
          >
            в корзину
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      <FormOrder />
    </div>
  );
}
