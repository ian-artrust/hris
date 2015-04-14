<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_users extends CI_Model
{
    private $connectionName;
    function __construct(){
        parent::__construct();
    }
    public function setConnection($connectionName){
      $this->connectionName = $connectionName;
    }
    public function getConnection(){
      return $this->load->database($this->connectionName,TRUE);
    }

    public function getGridUsers($limit, $offset)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->select("u.id_user AS id, 
            u.username AS username,
            u.password AS password, 
            u.name AS name, 
            r.name AS role, 
            r.id_role AS id_role, 
            u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_user u');
        $db->join('sys_role r','r.id_role=u.id_role','left');
        // $db->join('sys_profile p','p.id_profile=u.id_profile','left');
        $db->order_by('u.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridUsers()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->select("u.id_user AS id, 
            u.username AS username,
            u.password AS password, 
            u.name AS name, 
            r.name AS role, 
            r.id_role AS id_role, 
            u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_user u');
        $db->join('sys_role r','r.id_role=u.id_role','left');
        // $db->join('sys_profile p','p.id_profile=u.id_profile','left');
        $db->order_by('u.name');
        $query = $db->get();
        return $query;
    }
    
    public function deleteUsers($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_user',$id);
        $db->delete('sys_user');
    }
   
    public function saveUsers($name, $username, $encrypt, $isactive, $role, $uuid)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_user', $uuid);
        $db->set('name', $name);
        $db->set('id_role', $role);
        $db->set('username', $username);
        $db->set('password', $encrypt);
        $db->set('isactive', $isactive);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_user');
    }
    public function getUUID(){   
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }
    public function saveConfirm($uuid){  
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_user')->where('id_user',$uuid)->get()->row()->id;
    }
    public function cekUser($username){     
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_user')->where('username',$username)->get()->row()->id;
    } 

    public function cekUserID($username, $id){ 
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_user')->where('username',$username)->where('id_user !=',$id)->get()->row()->id;
    } 

    public function updateUsers($name, $username, $encrypt, $isactive, $role, $id){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $data = array(
                       'name'               => $name,
                       'username'           => $username,
                       'password'           => $encrypt,
                       'id_role'            => $role,
                       'isactive'           => $isactive,
                       'updated'            => date('Y-m-d H:i:s'),
                       'updatedby'          => $this->session->userdata('id')
                    );
        $db->where('id_user',$id);
        $db->update('sys_user', $data);              
    }
    public function searchGridUsers($username)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("u.id_user AS id, 
            u.username AS username,
            u.password AS password, 
            u.name AS name, 
            r.name AS role, 
            r.id_role AS id_role, 
            u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_user u');
        $db->join('sys_role r','r.id_role=u.id_role','left');
        // $db->join('sys_profile p','p.id_profile=u.id_profile','left');
        $db->like('LOWER(u.username)', strtolower($username));
        $db->or_like('LOWER(u.name)', strtolower($username));
        $db->order_by('u.name');
        $query = $db->get();
        return $query;
    }
    public function printUsers()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("u.id_user AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role, o.name AS org,
            u.lastname AS lastname, u.description AS description, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
            u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $db->from('sys_user AS u');
        $db->join('sys_user AS u1', 'u.createdby=u1.id_user');
        $db->join('sys_user AS u2', 'u.updatedby=u2.id_user');
        $db->join('sys_role r','r.id_role=u.id_role');
        $db->join('ad_organisasi o','u.ad_organisasi_id=o.ad_organisasi_id','left');
        $db->order_by('name');
        $query = $db->get();
        return $query;
    }

    public function cekPswd(){   
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('password AS id', FALSE)->from('sys_user')->where('id_user',$this->session->userdata('id'))->get()->row()->id;
    }

    public function updatePswd($newpswd1){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $data = array(
                       'password'       => $newpswd1,
                       'updated'        => date('Y-m-d H:i:s'),
                       'updatedby'      => $this->session->userdata('id')
                    );
        $db->where('id_user',$this->session->userdata('id'));
        $db->update('sys_user', $data);              
    } 
}