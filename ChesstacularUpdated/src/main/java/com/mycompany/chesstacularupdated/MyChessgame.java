/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.chesstacularupdated;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author allisonfrauenpreis, Daniel Schoepflin
 */
@ServerEndpoint (value="/chessgameendpoint", encoders = {ChessboardEncoder.class}, decoders = {ChessboardDecoder.class})

public class MyChessgame {
    
    // list of players connected to server
    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @OnMessage
    public void broadcastFigure(Chessboard chessboard, Session session) throws IOException, EncodeException {
        System.out.println("broadcastFigure: " + chessboard);
        for (Session peer : peers) {
            if (!peer.equals(session)) {
                peer.getBasicRemote().sendObject(chessboard);
            }
        }
    }
    
    // code to be injected into interface
    @OnOpen
    public void onOpen (Session peer)
    {
        peers.add(peer);
    }
    
    @OnClose
    public void onClose (Session peer)
    {
        peers.remove(peer);
    }
    
    
}
