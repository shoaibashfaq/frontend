import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  joinGroupThunk,
  getMembersThunk,
} from "../../redux/groups/group.actions";
import { createCustomerThunk } from "../../redux/stripe/stripe.actions";
import styled from "styled-components";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Chip,
  Box,
} from "@mui/material";

const PageBackground = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, #2d6a4f, #74c69d);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DottedBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 20px;
  margin: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  background-color: #fafafa;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Navbar = styled.div`
  position: absolute;
  top: 0;
  padding: 20px 0 0 30px;
  display: flex;
  justify-content: flex-start;
`;

const AddMembers = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.committee_groups);
  console.log("members inside component", members);
  const location = useLocation();
  const navigate = useNavigate();
  const groupId = location.state.groupId;
  const group_name = location.state.groupName;

  useEffect(() => {
    dispatch(getMembersThunk(groupId));
  }, [dispatch]);

  const handleSubmit = async () => {
    dispatch(joinGroupThunk(groupId));
    dispatch(createCustomerThunk());
    alert("YOU'RE NOW PART OF A COMMITTEE GROUP!");
  };
  const handleClick = () => {
    navigate("/activate")
  }

  return (
    <PageBackground>
      <Navbar>
        <Grid container spacing={2}>
          <Grid item>
            <Chip
              label="Committee-San"
              component={Link}
              to="/committeesan"
              clickable
              size="medium"
              sx={{
                padding: "20px 30px",
                fontSize: "1.2rem",
                backgroundColor: "limegreen",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "darkblue",
                },
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label="Committee-San Groups"
              component={Link}
              to="/creategroup"
              clickable
              size="medium"
              sx={{
                padding: "20px 30px",
                fontSize: "1.2rem",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkblue",
                },
              }}
            />
          </Grid>
        </Grid>
      </Navbar>
      <Container maxWidth="sm">
        <ContentContainer>
          <Typography
            variant="h2"
            align="center"
            sx={{ color: "black", fontWeight: "bold" }}
            gutterBottom
          >
            {group_name}
          </Typography>

          <DottedBox>
            <Grid>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "limegreen",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                  minWidth: "450px",
                }}
                onClick={handleSubmit}
              >
                Join Group
              </Button>
            </Grid>
          </DottedBox>
          <Typography variant="h2">
            <span style={{ color: "black", fontWeight: "bold" }}>Group</span>{" "}
            <span style={{ color: "limegreen", fontWeight: "bold" }}>
              Members
            </span>
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {members &&
              members.length > 0 &&
              members.map(
                (
                  item,
                  index // assuming item has no unique id
                ) => (
                  <Box key={index} m={1}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "limegreen",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "black",
                        },
                      }}
                    >
                      {item.first_name}
                    </Button>
                  </Box>
                )
              )}
          </Box>
        </ContentContainer>
      </Container>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "limegreen",
          color: "#fff",
        }}
        onClick={handleClick}
      >
        Activate
      </Button>
    </PageBackground>
  );
};

export default AddMembers;
