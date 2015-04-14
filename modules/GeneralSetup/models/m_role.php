<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_role extends CI_Model
{
    private $connectionName;
    public function __construct(){
            parent::__construct();
    }
    public function setConnection($connectionName){
      $this->connectionName = $connectionName;
    }
    public function getConnection(){
      return $this->load->database($this->connectionName,TRUE);
    }

    public function getGridRole($limit, $offset)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("id_role AS id, name AS name, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_role');
        $db->order_by('name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridRole()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("id_role AS id, name AS name, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_role');
        $db->order_by('name', FALSE);
        $query = $db->get();
        return $query;
    }

    public function viewRole()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("id_role AS id, name AS name", FALSE);
        $db->from('sys_role');
        $db->where('isactive','Y');
        $db->like('name', $this->input->post('query'), 'after'); 
        $db->order_by('name', FALSE);
        $query = $db->get();
        return $query;
    }

    public function getMenu($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("rm.id_rolemenu AS id, CAST(m.id_menu as varchar(10)) AS menu, m.name AS name, 
            CASE WHEN rm.isactive = 'Y' THEN 1 ELSE 0 END AS isactive,
            CASE WHEN rm.iscreate = 'Y' THEN 1 ELSE 0 END AS iscreate,
            CASE WHEN rm.isupdate = 'Y' THEN 1 ELSE 0 END AS isupdate,
            CASE WHEN rm.isdelete = 'Y' THEN 1 ELSE 0 END AS isdelete,
            CASE WHEN rm.isprocess = 'Y' THEN 1 ELSE 0 END AS isprocess", FALSE);
        $db->from('sys_role_menu AS rm');
        $db->join('sys_menu AS m', 'rm.id_menu=m.id_menu');
        $db->where('rm.id_role', $id);
        $db->where('m.isactive', 'Y');
        $db->order_by('CAST(m.id_menu as varchar(10))', FALSE);
        $query = $db->get();
       
        return $query;
    }

    public function saveRole($name, $isactive, $uuid)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_role', $uuid);
        $db->set('name', $name);
        $db->set('isactive', $isactive);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_role');
    }
    public function getUUID()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }
    public function saveConfirm($uuid)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_role')->where('id_role',$uuid)->get()->row()->id;
    }
    public function cekRole($username)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_role')->where('name',$username)->get()->row()->id;
    }
    public function cekRoleUser($username)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('id_role',$username)->get()->row()->id;
    }
    public function cekRoleMenu($username)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_role_menu')->where('id_role',$username)->get()->row()->id;
    }
    public function searchGridRole($username)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("id_role AS id, name AS name, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_role');
        $db->like('LOWER(name)', strtolower($username));
        $db->order_by('name', FALSE);
        $query = $db->get();
        return $query;
    }
    public function cekRoleID($username, $id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_role')->where('name',$username)->where('id_role !=',$id)->get()->row()->id;
    } 
    public function updateRole($name, $isactive, $id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
            $data = array(
                           'name'           => $name,
                           'isactive'       => $isactive,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );
            $db->where('id_role',$id);
            $db->update('sys_role', $data);              
    }

    public function deleteMenu($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_role',$id);
        $db->delete('sys_role');
    }
    
    public function printRole()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("u.name AS name, u.description AS description,
            u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $db->from('sys_role AS u');
        $db->join('ad_user AS u1', 'u.createdby=u1.ad_user_id');
        $db->join('ad_user AS u2', 'u.updatedby=u2.ad_user_id');
        $db->order_by('name', FALSE);
        $query = $db->get();
        return $query;
    }
    public function cekIDMenu($id, $idrole)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_role_menu')->where('id_menu',$id)->where('id_role',$idrole)->get()->row()->id;
    }
    public function saveConfirmMenu($uuid)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_role_menu')->where('id_rolemenu',$uuid)->get()->row()->id;
    }
    public function saveRoleMenu($id, $idrole, $isactive, $iscreate, $isupdate, $isdelete, $isprocess, $uuid)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_rolemenu', $uuid);
        $db->set('id_menu', $id);
        $db->set('id_role', $idrole);
        $db->set('isactive', $isactive);
        $db->set('iscreate', $iscreate);
        $db->set('isupdate', $isupdate);
        $db->set('isdelete', $isdelete);
        $db->set('isprocess', $isprocess);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_role_menu');
    }
    public function deleteRoleMenu($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_rolemenu',$id);
        $db->delete('sys_role_menu');
    }
}