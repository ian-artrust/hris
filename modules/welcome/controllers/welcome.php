<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends IAN_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model('dashboard/user_model');
	}

	public function index(){
		$this->load->view('login');
	}

	function validasi(){
		$this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
		$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean');

		$username 	= $this->input->post('username');
		$password 	= $this->input->post('password');
		$result 	= $this->user_model->validasi($username,$password);

		if($result){
			$sess_array = array();
			foreach ($result as $row) {
				$sess_array = array('logged_in'=>TRUE, 'id'=>$row->id_user, 'name'=>$row->name, 'username'=>$row->username);
				$this->session->set_userdata($sess_array);
			}
			//return TRUE;
		} else {
			$this->form_validation->set_message("Username atau Password Salah");
			//return FALSE;
		}

		if($this->form_validation->run()==FALSE){
			redirect('welcome');
		} else {
			redirect('dashboard/user_area');
		}
	}

	function logout(){
		$this->session->sess_destroy();
		redirect('welcome');
	}
}