package services.kraken_servicio;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import services.dto.ClienteExternoWebEntity;
import play.libs.ws.WSClient;
import utils.WSHandler;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.io.IOException;

@Singleton
public class KrakenServicio {

    private final WSClient ws;
    private final String URL = "http://api.hecticus.com/client";

    @Inject
    public KrakenServicio(WSClient ws) {
        this.ws = ws;
    }

    public void CrearAlta(String msisdn, String numeroCorto,  String msg) throws IOException {
        WSHandler.instance().MakeGet("http://02.kapp.hecticus.com/ws/receiveMO.php?source=" + msisdn + "&destination=" + numeroCorto + "&service_type=pacws&msg="+ msg +"&received_time=20151118170000" );
    }

    public ClienteExternoWebEntity obtenerUsuario(String msisdn, String business, String carrier, String country) throws IOException {
        ClienteExternoWebEntity clienteExterno = new ClienteExternoWebEntity();
        JsonNode response =  WSHandler.instance().MakeGetJson(URL +  "/" + msisdn +  "/" + business +  "/" + carrier +  "/" + country);
        ObjectMapper mapper = new ObjectMapper();
        if (response.get("response").isArray()) {
            for (final JsonNode objNode : response.get("response")) {
                ClienteExternoWebEntity value = mapper.readValue(objNode.toString(), ClienteExternoWebEntity.class);
                return value;
            }
        }
        return null;
    }


    public ClienteExternoWebEntity obtenerUsuario(String msisdn, String password, int country) throws IOException {
        ClienteExternoWebEntity clienteExterno = new ClienteExternoWebEntity();
        JsonNode response =  WSHandler.instance().MakeGetJson(URL +  "-recover/" + msisdn +  "/" + country +  "/" + password);
        ObjectMapper mapper = new ObjectMapper();
        if (response.has("service")) {
            return mapper.readValue(response.get("client").toString(), ClienteExternoWebEntity.class);
        }
        return null;
    }


    public ClienteExternoWebEntity obtenerUsuario(String msisdn) throws IOException {
        ClienteExternoWebEntity clienteExterno = new ClienteExternoWebEntity();
        JsonNode response =  WSHandler.instance().MakeGetJson(URL +  "/" + msisdn +  "/10/9/6");
        ObjectMapper mapper = new ObjectMapper();
        if (response.get("response").isArray()) {
            for (final JsonNode objNode : response.get("response")) {
                ClienteExternoWebEntity value = mapper.readValue(objNode.toString(), ClienteExternoWebEntity.class);
                return value;
            }
        }
        return null;
    }
}
