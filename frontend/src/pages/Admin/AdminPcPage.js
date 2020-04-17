import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { PcCreate } from "components/PC/PcCreate"
import { PcList } from "components/PC/PcList/PcList"
import { AuthContext } from "context/AuthContext"
import { useAlert } from "hooks/alert.hook"
import { useHttp } from "hooks/http.hook"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}))

const AdminPcPage = () => {
	const classes = useStyles()

	const message = useAlert()

	const { token } = useContext(AuthContext)
	const { request } = useHttp()

	const fetchPcs = useCallback(async () => {
		const fetched = await request(`/api/pc`, "GET", null)
		setPcs(fetched)
	}, [request])

	useEffect(() => {
		fetchPcs()
	}, [fetchPcs])

	const [pcs, setPcs] = useState(fetchPcs)

	const deleteHandler = async (id) => {
		try {
			await request(`/api/pc/delete/${id}`, "GET", null, {
				Authorization: `Bearer ${token}`,
			})
			fetchPcs()
			message(`PC with id:${id} deleted`)
		} catch (error) {
			console.log(error)
			message(error)
		}
	}

	const createHandler = async (values) => {
		console.log("values", values)
		try {
			await request(
				"/api/pc/generate",
				"POST",
				{ ...values },
				{ Authorization: `Bearer ${token}` },
			)
			fetchPcs()
			message(`PC with name: ${values.name} saved`)
			console.log("values", values)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Grid container spacing={2} className={classes.root}>
			<Grid item xs={3}>
				<PcCreate pcs={pcs} createHandler={createHandler} />
			</Grid>

			<Grid item xs={9}>
				<Grid container spacing={2}>
					{pcs && (
						<PcList pcs={pcs} deleteAllow="true" deleteHandler={deleteHandler} />
					)}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default AdminPcPage
