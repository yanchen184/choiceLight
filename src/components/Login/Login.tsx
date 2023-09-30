import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row } from "antd";
import "./BingoGame.css";
import { db } from "../../firebase.tsx";
import { ref, onValue, set, get } from "firebase/database";
import useFirebase from "../hook/useFirebase.tsx";

const Login: React.FC = () => {
    
}