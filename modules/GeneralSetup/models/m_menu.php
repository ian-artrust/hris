<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_menu extends CI_Model
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

    public function getGridMenu($limit, $offset)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("CAST(id_menu as varchar(10)) AS id, name AS name, parent AS parent, icon AS icon, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_menu');
        $db->order_by('CAST(id_menu as varchar(10))', FALSE);
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridMenu()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("CAST(id_menu as varchar(10)) AS id, name AS name, parent AS parent, icon AS icon, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_menu');
        $db->order_by('CAST(id_menu as varchar(10))', FALSE);
        $query = $db->get();
        return $query;
    }
    public function getViewMenu()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("CAST(id_menu as varchar(10)) AS id, name AS name", FALSE);
        $db->from('sys_menu');
        $db->where('parent',0);
        $db->where('isactive','Y');
        $db->like('name', $this->input->post('query'), 'after'); 
        $db->order_by('id_menu');
        $query = $db->get();
        return $query;
    }
    public function getViewAllMenu()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("CAST(id_menu as varchar(10)) AS id, name AS name", FALSE);
        $db->from('sys_menu');
        $db->where('isactive','Y');
        $db->like('name', $this->input->post('query'), 'after'); 
        $db->order_by('CAST(id_menu as varchar(10))', FALSE);
        $query = $db->get();
        return $query;
    }

    public function deleteMenu($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_menu',$id);
        $db->delete('sys_menu');
    }

    public function delHirMenu($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('parent',$id);
        $db->delete('sys_menu');
        $this->deleteMenu($id);
    }


    
    public function saveMenu($id, $name, $parent, $icon, $isactive)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
            $db->set('id_menu', $id);
            $db->set('name', $name);
            $db->set('parent', $parent);
            $db->set('icon', $icon);
            $db->set('isactive', $isactive);
            $db->set('createdby', $this->session->userdata('id'));
            $db->set('created', date('Y-m-d H:i:s'));
            $db->set('updatedby', $this->session->userdata('id'));
            $db->set('updated', date('Y-m-d H:i:s'));
            if($parent > 0){
                $nameParent = $this->getParent($parent);
                $cls = 'SMS.module.'.$nameParent.'.'.$name.'.view.'.$name;
                $db->set('leaf', 'TRUE');
                $db->set('selector', $name);
                $db->set('cls', $cls);
            } else {
                $db->set('selector', '');
                $db->set('cls', '');
            }
            $db->insert('sys_menu');
    }
    public function getParent($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select("REPLACE(name, ' ', '') AS id", FALSE)->from('sys_menu')->where('id_menu',$id)->get()->row()->id;
    }
    public function saveConfirm($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_menu')->where('id_menu',$id)->get()->row()->id;
    }
    public function cekMenu($name)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_menu')->where('name',$name)->get()->row()->id;
    }

    public function cekParent($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('parent AS id')->from('sys_menu')->where('id_menu',$id)->get()->row()->id;
    } 

    public function cekAnak($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_menu')->where('parent',$id)->get()->row()->id;
    }

    public function cekRoleMenu($id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_role_menu')->where('id_menu',$id)->get()->row()->id;
    } 

    public function cekMenuID($name, $id)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_menu')->where('name',$name)->where('id_menu !=',$id)->get()->row()->id;
    } 
    public function updateMenu($id, $name, $parent, $icon, $isactive)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        if($parent > 0){
            $nameParent = $this->getParent($parent);
            $cls = 'SMS.module.'.$nameParent.'.view.'.$name;
            $data = array(
                           'name'           => $name,
                           'parent'         => $parent,
                           'icon'           => $icon,
                           'isactive'       => $isactive,
                           'selector'       => $name,
                           'cls'            => $cls,
                           'leaf'           => 'TRUE',                          
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );             

        } else {
            $data = array(
                           'name'           => $name,
                           'parent'         => $parent,
                           'icon'           => $icon,
                           'isactive'       => $isactive,
                           'selector'       => '',
                           'cls'            => '',
                           'leaf'           => 'FALSE',
                           'description'    => $description,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );            
        }
            $db->where('id_menu',$id);
            $db->update('sys_menu', $data);              
    } 
    public function searchGridMenu($username)
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("CAST(id_menu as varchar(10)) AS id, name AS name, parent AS parent, icon AS icon, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('sys_menu');
        $db->like('LOWER(name)', strtolower($username));      
        $db->order_by('CAST(id_menu as varchar(10))', FALSE);
        $query = $db->get();
        return $query;
    }
    public function printMenu()
    {
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->select("CAST(u.id_menu as varchar(10)) AS id, u.name AS name, u.parent AS parent, 
            u.icon AS icon, u.isactive AS active, u1.name AS dibuat, 
            to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $db->from('sys_menu AS u');
        $db->join('ad_user AS u1', 'u.createdby=u1.ad_user_id');
        $db->join('ad_user AS u2', 'u.updatedby=u2.ad_user_id');
        $db->order_by('CAST(u.id_menu as varchar(10))', FALSE);
        $query = $db->get();
        return $query;
    }
}