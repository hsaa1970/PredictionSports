
package services.digitel_servicio.subscription;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebService(name = "SubscriptionWS", targetNamespace = "http://subscription.amc/")
public interface SubscriptionWS {


    /**
     * 
     * @param idDeServicio
     * @param telefono
     * @return
     *     returns amc.subscription.Response
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "cancelar", targetNamespace = "http://subscription.amc/", className = "amc.subscription.Cancelar")
    @ResponseWrapper(localName = "cancelarResponse", targetNamespace = "http://subscription.amc/", className = "amc.subscription.CancelarResponse")
    public Response cancelar(
        @WebParam(name = "telefono", targetNamespace = "")
        String telefono,
        @WebParam(name = "idDeServicio", targetNamespace = "")
        String idDeServicio);

    /**
     * 
     * @param idDeServicio
     * @param telefono
     * @return
     *     returns amc.subscription.Response
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "validar", targetNamespace = "http://subscription.amc/", className = "amc.subscription.Validar")
    @ResponseWrapper(localName = "validarResponse", targetNamespace = "http://subscription.amc/", className = "amc.subscription.ValidarResponse")
    public Response validar(
        @WebParam(name = "telefono", targetNamespace = "")
        String telefono,
        @WebParam(name = "idDeServicio", targetNamespace = "")
        String idDeServicio);

    /**
     * 
     * @param idDeServicio
     * @param telefono
     * @return
     *     returns amc.subscription.Response
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "registrar", targetNamespace = "http://subscription.amc/", className = "amc.subscription.Registrar")
    @ResponseWrapper(localName = "registrarResponse", targetNamespace = "http://subscription.amc/", className = "amc.subscription.RegistrarResponse")
    public Response registrar(
        @WebParam(name = "telefono", targetNamespace = "")
        String telefono,
        @WebParam(name = "idDeServicio", targetNamespace = "")
        String idDeServicio);

    /**
     * 
     * @param contentId
     * @param telefono
     * @param serviceId
     * @return
     *     returns amc.subscription.Response
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "cobrar", targetNamespace = "http://subscription.amc/", className = "amc.subscription.Cobrar")
    @ResponseWrapper(localName = "cobrarResponse", targetNamespace = "http://subscription.amc/", className = "amc.subscription.CobrarResponse")
    public Response cobrar(
        @WebParam(name = "telefono", targetNamespace = "")
        String telefono,
        @WebParam(name = "serviceId", targetNamespace = "")
        String serviceId,
        @WebParam(name = "content_id", targetNamespace = "")
        int contentId);

}
