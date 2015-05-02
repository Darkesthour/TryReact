var TableData = React.createClass({

	/* 
	 * When user checked a checkbox we need to render app 
	 * by set modified data into onCheckAll props and 
	 * catch it in parent (App) component
	 */
	onChange: function(e)
	{
		var newData = this.props.data.map(function(user){
			return {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				active: user.id == e.target.getAttribute('value') ? !user.active: user.active
			}
		});

		this.props.onCheck(newData);
	},

	render: function()
	{
		var tbody = this.props.data.map(function(user, ind){
			return (
				<tr>
					<th scope="row">
						<input 
							type="checkbox" 
							checked={user.active} 
							value={user.id} 
							onChange={this.onChange} />
					</th>
					<td>{user.firstName}</td>
					<td>{user.lastName}</td>
					<td>{user.username}</td>
				</tr>
			);
		}.bind(this));

		return (
			<table className="table">
	            <thead>
	                <tr>
	                    <th>#</th>
	                    <th>First Name</th>
	                    <th>Last Name</th>
	                    <th>Username</th>
	                </tr>
	            </thead>
	            <tbody>
	            	{tbody}
	            </tbody>
	        </table>
		);
	}
});

var MainCheck = React.createClass({

	// Set checked for main checkbox to false
	getInitialState: function()
	{
		return { active: false };
	},

	/* 
	 * When user checked a checkbox we need to render app 
	 * by set modified data into onCheckAll props and 
	 * catch it in parent (App) component
	 */
	onChange: function()
	{
		this.setState({ active: !this.state.active });

		var newData = this.props.data.map(function(user){
			return {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				active: !this.state.active
			}
		}.bind(this));

		this.props.onCheckAll(newData);
	},

	render: function()
	{
		return <input 
					className="multi-select" 
					type="checkbox" 
					checked={this.state.active} 
					onChange={this.onChange} />;
	}
});

var PrintBtn = React.createClass({

	// Print ids where user's active flag is true
	onClick: function(e)
	{
		var ids = [],
			data = this.props.data;
		for(var i = 0; i < data.length; i++)
		{
			if (data[i].active)
			{
				ids.push(data[i].id);
			}
		}

		console.log('Selected users: [' + ids + ']');
	},

	render: function()
	{
		return <button onClick={this.onClick} className="btn btn-default action-button" type="submit">Show selected id's</button>;
	}
});

var App = React.createClass({

	getInitialState: function()
	{
		return {
			data: this.getData()
		}
	},
	
	// Get static data (or from the server)
	getData: function()
	{
		return [
			{id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', active: false},
			{id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', active: true},
			{id: 3, firstName: 'Larry', lastName: 'the Bird', username: '@twitter', active: false}
		];
	},

	// Catch modified data
	changeSelection: function(newData)
	{
		this.setState({ data: newData });
	},

	render: function()
	{
		return (
			<div className="panel panel-default">
    			<div className="panel-heading">
    				<MainCheck data={this.state.data} onCheckAll={this.changeSelection}/>
    				<PrintBtn data={this.state.data}/>
    			</div>
    			<div className="panel-body">
					<TableData data={this.state.data} onCheck={this.changeSelection}/>
    			</div>
    		</div>
		);
	}
})

React.render(<App/>, document.getElementById('main'));
