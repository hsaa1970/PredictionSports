package modeles;

import com.avaje.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Alta extends Model {
    @Id
    private Long id;
    @Column()
    private String clickid;
    @Column()
    private String pid;
    @Column()
    private String msisdn;

    public Alta() {
    }

    public Alta(String clickid, String pid, String msisdn) {
        this.clickid = clickid;
        this.pid = pid;
        this.msisdn = msisdn;
    }

    public String getClickid() {
        return clickid;
    }

    public void setClickid(String clickid) {
        this.clickid = clickid;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getMsisdn() {
        return msisdn;
    }

    public void setMsisdn(String msisdn) {
        this.msisdn = msisdn;
    }

    @Override
    public String toString() {
        return "Alta{" +
            "id=" + id +
            ", clickid='" + clickid + '\'' +
            ", pid='" + pid + '\'' +
            ", msisdn='" + msisdn + '\'' +
            '}';
    }
}
